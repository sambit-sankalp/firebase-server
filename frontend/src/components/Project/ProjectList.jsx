import React from "react";
import { useSelector } from "react-redux";
import { useFirestoreConnect } from "react-redux-firebase";
import ProjectCard from "./ProjectCard";

const ProjectList = () => {
  useFirestoreConnect([{ collection: "projects" }]);

  const projects = useSelector((state) => state.firestore.ordered.projects);
  return (
    <div>
      {projects &&
        projects.map((project) => {
          <ProjectCard key={project.id} project={project} />;
        })}
    </div>
  );
};

export default ProjectList;
