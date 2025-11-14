import { exec } from "child_process";
import fs from "fs";
import path from "path";
import { Url } from "./lighthouse.types.js";

export const runLighthouse = async (url: Url) => {
  const outputFile = path.join(process.cwd(), `lh-report-${Date.now()}.json`);

  return new Promise((resolve, reject) => {
    exec(
      `lighthouse ${url} --output=json --output-path=${outputFile} --quiet --chrome-flags="--headless --no-sandbox --disable-dev-shm-usage --disable-gpu --disable-software-rasterizer --disable-extensions"`,
      (err) => {
        if (err) {
          if (fs.existsSync(outputFile)) {
            fs.unlinkSync(outputFile);
          }
          return reject(err);
        }

        try {
          const raw = fs.readFileSync(outputFile, "utf-8");
          const data = JSON.parse(raw);

          fs.unlinkSync(outputFile);

          const result = data.lighthouseResult || data;

          if (!result.categories) {
            return reject(new Error("Invalid Lighthouse output: categories not found"));
          }

          const opportunities = [];
          const diagnostics = [];

          for (const [key, audit] of Object.entries(result.audits)) {
            const auditData = audit as any;
            if (auditData.details?.type === 'opportunity' && auditData.score !== null && auditData.score < 1) {
              opportunities.push({
                auditId: key,
                title: auditData.title,
                description: auditData.description,
                score: auditData.score,
                displayValue: auditData.displayValue || '',
                numericValue: auditData.numericValue || 0,
                numericUnit: auditData.numericUnit || '',
              });
            }
          }

          for (const [key, audit] of Object.entries(result.audits)) {
            const auditData = audit as any;
            if (auditData.details?.type === 'table' && auditData.score !== null && auditData.score < 1) {
              diagnostics.push({
                auditId: key,
                title: auditData.title,
                description: auditData.description,
                score: auditData.score,
                displayValue: auditData.displayValue || '',
              });
            }
          }

          opportunities.sort((a, b) => (b.numericValue || 0) - (a.numericValue || 0));

          resolve({
            domain: url,
            performance: result.categories.performance.score * 100,
            lcp: result.audits["largest-contentful-paint"].numericValue,
            fcp: result.audits["first-contentful-paint"].numericValue,
            cls: result.audits["cumulative-layout-shift"].numericValue,
            tbt: result.audits["total-blocking-time"].numericValue,
            opportunities: opportunities.slice(0, 5),
            diagnostics: diagnostics.slice(0, 5),
          });
        } catch (parseError) {
          if (fs.existsSync(outputFile)) {
            fs.unlinkSync(outputFile);
          }
          reject(parseError);
        }
      }
    );
  });
}
