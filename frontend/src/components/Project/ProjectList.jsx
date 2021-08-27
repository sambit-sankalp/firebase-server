import React from "react";
import { useSelector } from "react-redux";
import { useFirestoreConnect } from "react-redux-firebase";
import { Link } from "react-router-dom";

import { Fab } from "@material-ui/core";
import { Add } from "@material-ui/icons";

import ProjectCard from "./ProjectCard";

const ProjectList = () => {
  useFirestoreConnect([{ collection: "projects" }]);

  const projects = useSelector((state) => state.firestore.ordered.projects);
  return (
    <div>
      <Link to="/addproject">
        <Fab color="primary" aria-label="add">
          <Add />
        </Fab>
      </Link>

      {projects &&
        projects.map((project) => {
          <ProjectCard key={project.id} project={project} />;
        })}
    </div>
  );
};

export default ProjectList;
