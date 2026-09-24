import React from "react";

export interface CaseStudy {
    slug: string;
    name: string;
    summary: string;
    content: React.ReactNode;
}

export const caseStudies: CaseStudy[] = [
    {
        slug: "telecom-event-platform",
        name: "Telecom Event Management Platform",
        summary: "Sole full-stack engineer on Metal Plus' event-management platform for Grameenphone.",
        content: (
            <>
                <p>
                    Sole full-stack engineer on Metal Plus' event-management platform for
                    Grameenphone — a Go REST API, PostgreSQL, a Flutter field client, and a
                    Next.js admin dashboard, shipped to production on AWS.
                </p>
                <p>Full write-up coming soon.</p>
            </>
        ),
    },
    {
        slug: "gp-sync",
        name: "Grameenphone delivery",
        summary: "Rescued and stabilised the legacy GP Sync codebase for Grameenphone's equipment-inventory system.",
        content: (
            <>
                <p>
                    Inherited the legacy GP Sync codebase for Grameenphone's
                    equipment-inventory system after it had fallen into disrepair.
                </p>
                <ul>
                    <li>Rescued and stabilised a legacy codebase with no prior documentation or handover.</li>
                    <li>Fixed several critical bugs that were blocking reliable deployment.</li>
                    <li>Stabilised the deployment pipeline, then took over the in-progress equipment-inventory system.</li>
                </ul>
            </>
        ),
    },
];
