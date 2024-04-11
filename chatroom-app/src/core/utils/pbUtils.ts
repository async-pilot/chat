import { RecordModel } from "pocketbase";

import { pocketbaseUrl } from "@/core/config/apiRoutes";
import { clientPocketbaseUrl } from "@/core/config/client";

// https://github.com/pocketbase/js-sdk/blob/bc0bcb1c6023bbeea18d4746df07d1e95ed2cefd/src/Client.ts#L225
export const getFileUrl = (
  record: Pick<RecordModel, "id" | "collectionId" | "collectionName">,
  filename: string
): string => {
  if (!filename || !record?.id || !(record?.collectionId || record?.collectionName)) {
    return "";
  }

  const parts = [];
  parts.push("api");
  parts.push("files");
  parts.push(encodeURIComponent(record.collectionId || record.collectionName));
  parts.push(encodeURIComponent(record.id));
  parts.push(encodeURIComponent(filename));

  return buildUrl(parts.join("/"));
};

// https://github.com/pocketbase/js-sdk/blob/bc0bcb1c6023bbeea18d4746df07d1e95ed2cefd/src/Client.ts#L236
const buildUrl = (path: string): string => {
  let url = pocketbaseUrl ?? clientPocketbaseUrl;

  // construct an absolute base url if in a browser environment
  if (typeof window !== "undefined" && !!window.location && !url.startsWith("https://") && !url.startsWith("http://")) {
    url = window.location.origin?.endsWith("/")
      ? window.location.origin.substring(0, window.location.origin.length - 1)
      : window.location.origin || "";

    if (!pocketbaseUrl.startsWith("/")) {
      url += window.location.pathname || "/";
      url += url.endsWith("/") ? "" : "/";
    }

    url += pocketbaseUrl;
  }

  // concatenate the path
  if (path) {
    url += url.endsWith("/") ? "" : "/"; // append trailing slash if missing
    url += path.startsWith("/") ? path.substring(1) : path;
  }

  return url;
};
