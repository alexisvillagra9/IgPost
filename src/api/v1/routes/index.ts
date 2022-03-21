import { Router } from "express";
import fs from "fs";
import path from "path";

const routesDir = Router();

const addRoutes = (base: string, childrenPaths: string[]) => {
  childrenPaths.forEach((childPath) => {
    // Skip folders
    if (["controllers", "jobs", "helpers"].includes(childPath)) return;

    const pathJoin = path.join(base, childPath);
    const dirs = fs.readdirSync(pathJoin, { withFileTypes: true });

    if (childPath === "routes") {
      const files = dirs.filter((dir) => dir.isFile()).map((dir1) => dir1.name);
      files.forEach((file) => {
        if (file.includes("index")) return;

        const pathApiFile = path.join(
          pathJoin.replace("src\\", ""),
          file.split(".").slice(0, -1).join(".")
        );
        const fileRoute = path.join(
          "..",
          pathApiFile.replace("api\\", "").substring(2)
        );

        const fileRouteExp = require(fileRoute);
        const pathApi = `/${pathApiFile
          .replace("routes", "")
          .replace("\\\\", "\\")
          .replace(/\\/g, "/")}`;

        routesDir.use(pathApi, fileRouteExp);
        console.log("RUTAS CARGADA ---->", pathApi);
      });
    } else {
      // console.log(pathJoin);
      const folders = dirs
        .filter((dir) => !dir.isFile())
        .map((dir1) => dir1.name);
      if (folders.length) addRoutes(pathJoin, folders);
    }
  });
};

const srcPath = "src/api";
addRoutes(srcPath, [""]);

export default routesDir;
