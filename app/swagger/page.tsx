"use client";

import SwaggerUI from "swagger-ui-react";
import "swagger-ui-react/swagger-ui.css";
import React from "react";

export default function SwaggerPage() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black p-6">
      <div className="mx-auto max-w-5xl bg-white dark:bg-[#0b0b0b] shadow-md rounded">
        <div className="p-4 border-b">
          <h1 className="text-xl font-semibold">API Docs — Hospitality DEMO</h1>
          <p className="text-sm text-zinc-600">Target server: <code>http://192.168.144.63:5001</code></p>
        </div>
        <div>
          <SwaggerUI
            url="/openapi.json"
            // Intercept requests made by Swagger UI and route them through our proxy
            requestInterceptor={(req: any) => {
              try {
                const original = new URL(req.url);
                // forward through our proxy path; keep original search params
                req.url = `/api/proxy/${original.pathname.replace(/^\//, "")}${original.search}`;
              } catch (e) {
                // if parsing fails, leave req.url unchanged
              }
              return req;
            }}
          />
        </div>
      </div>
    </div>
  );
}
