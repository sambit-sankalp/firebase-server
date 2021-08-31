import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { CircularProgress, Fab } from "@material-ui/core";
import { Add } from "@material-ui/icons";

import ProjectCard from "./ProjectCard";
import { Alert } from "bootstrap";
import { allProjects } from "../../store/actions/projectActions";

const ProjectList = () => {
  const projectList = useSelector((state) => state.projectList);
  const { loading, projects, error } = projectList;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(allProjects());
  }, [dispatch]);

  return (
    <div>
      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Alert severity="error">{error}</Alert>
      ) : (
        <div>
          {projects ? (
            projects.forEach((doc) => {
              console.log(doc.data());
              <ProjectCard key= {doc.id} project={doc.data}/>;
            })
          ) : (
            <div> No Projects</div>
          )}
        </div>
      )}
      ;
      <Link to="/addproject">
        <Fab color="primary" aria-label="add">
          <Add />
        </Fab>
      </Link>
    </div>
  );
};

export default ProjectList;
