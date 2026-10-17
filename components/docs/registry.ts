import type { ComponentType } from "react";
import type { DocSlug } from "@/lib/docs/content";
import type { TocItem } from "@/components/docs/prose";

import * as intro from "./pages/intro";
import * as quickstart from "./pages/quickstart";
import * as systemRequirements from "./pages/system-requirements";
import * as installCli from "./pages/install-cli";
import * as vscode from "./pages/vscode";
import * as firstEnvironment from "./pages/first-environment";
import * as shadowEnvironments from "./pages/shadow-environments";
import * as ephemeralPods from "./pages/ephemeral-pods";
import * as liveMirroring from "./pages/live-mirroring";
import * as branchIsolation from "./pages/branch-isolation";
import * as lifecycle from "./pages/lifecycle";
import * as previewUrls from "./pages/preview-urls";
import * as databaseSandbox from "./pages/database-sandbox";
import * as edgeFunctions from "./pages/edge-functions";
import * as testing from "./pages/testing";
import * as multiplayer from "./pages/multiplayer";
import * as ideIntegration from "./pages/ide-integration";
import * as envSecrets from "./pages/env-secrets";
import * as cliAll from "./pages/cli-all";
import * as cliInit from "./pages/cli-init";
import * as cliStart from "./pages/cli-start";
import * as cliStop from "./pages/cli-stop";
import * as cliStatus from "./pages/cli-status";
import * as cliDb from "./pages/cli-db";
import * as cliCollab from "./pages/cli-collab";
import * as cliTest from "./pages/cli-test";
import * as cliDeploy from "./pages/cli-deploy";
import * as configReference from "./pages/config-reference";
import * as outputReference from "./pages/output-reference";
import * as frameworks from "./pages/frameworks";
import * as docker from "./pages/docker";
import * as gitProviders from "./pages/git-providers";
import * as cloudProviders from "./pages/cloud-providers";
import * as databases from "./pages/databases";
import * as customPod from "./pages/custom-pod";
import * as vpcNetworking from "./pages/vpc-networking";
import * as security from "./pages/security";
import * as cost from "./pages/cost";
import * as selfHosted from "./pages/self-hosted";
import * as tutorialNextjs from "./pages/tutorial-nextjs";
import * as tutorialSandbox from "./pages/tutorial-sandbox";
import * as tutorialDebugging from "./pages/tutorial-debugging";
import * as tutorialCicd from "./pages/tutorial-cicd";
import * as commonIssues from "./pages/common-issues";
import * as syncFailures from "./pages/sync-failures";
import * as performance from "./pages/performance";
import * as support from "./pages/support";

/** A docs page body plus the H2 sections listed under "On this page". */
export type DocModule = { default: ComponentType; toc: TocItem[] };

// start-flow is the one page without a module: it renders the /start
// components directly (components/StartFlowContent.tsx).
export const docPages: Record<Exclude<DocSlug, "start-flow">, DocModule> = {
  intro,
  quickstart,
  "system-requirements": systemRequirements,
  "install-cli": installCli,
  vscode,
  "first-environment": firstEnvironment,
  "shadow-environments": shadowEnvironments,
  "ephemeral-pods": ephemeralPods,
  "live-mirroring": liveMirroring,
  "branch-isolation": branchIsolation,
  lifecycle,
  "preview-urls": previewUrls,
  "database-sandbox": databaseSandbox,
  "edge-functions": edgeFunctions,
  testing,
  multiplayer,
  "ide-integration": ideIntegration,
  "env-secrets": envSecrets,
  "cli-all": cliAll,
  "cli-init": cliInit,
  "cli-start": cliStart,
  "cli-stop": cliStop,
  "cli-status": cliStatus,
  "cli-db": cliDb,
  "cli-collab": cliCollab,
  "cli-test": cliTest,
  "cli-deploy": cliDeploy,
  "config-reference": configReference,
  "output-reference": outputReference,
  frameworks,
  docker,
  "git-providers": gitProviders,
  "cloud-providers": cloudProviders,
  databases,
  "custom-pod": customPod,
  "vpc-networking": vpcNetworking,
  security,
  cost,
  "self-hosted": selfHosted,
  "tutorial-nextjs": tutorialNextjs,
  "tutorial-sandbox": tutorialSandbox,
  "tutorial-debugging": tutorialDebugging,
  "tutorial-cicd": tutorialCicd,
  "common-issues": commonIssues,
  "sync-failures": syncFailures,
  performance,
  support,
};
