import { useEffect, useState } from "react";
import VarifySub from "../API/VarifySub";
import CreateProject, { ProjectSub } from "../API/CreateProject";
import GetProjects from "../API/GetProjects";
import JoinProject from "../API/JoinProject";
import Project from "./Project";
import GetIsAdmin from "../API/GetIsAdmin";
import { useUserContext } from "./Context";

export type projectDisplay = {
  name: string;
};

const Projects = () => {
  const user = useUserContext();
  const [createPage, setCreatPage] = useState(false);
  const [JoinProjectDisplay, setJoinProjectDisplay] = useState(false);
  const [projectID, setProjectID] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [project, setProject] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [joinError, setJoinError] = useState<string | null>(null);
  const [projectDisplays, setProjectDisplays] = useState<
    React.ReactNode[] | null
  >(null);
  const [proj, setProj] = useState<ProjectSub>({
    name: "",
    desc: "",
    pwd: "",
    pwd2: "",
  });

  const handleProjectSelect = async (name: string) => {
    const tmp = await GetIsAdmin(name);
    setIsAdmin(tmp);
    setProject(name);
  };

  const handleProjectJoin = async () => {
    const tmp = await JoinProject(projectID);
    if (typeof tmp === "string") {
      setJoinError(tmp);
    } else if (tmp) {
      setJoinError("Request Has Been Sent.");
    }
  };

  const displayProjects = async () => {
    const projects = await GetProjects();
    if (typeof projects === "string") {
      return;
    }
    if (projects) {
      let tmp: React.ReactNode[] = [];
      projects.map((element) => {
        tmp.push(
          <div className={`p-5 justify-evenly flex`} key={element.name}>
            {element.name}
            <button
              onClick={() => {
                handleProjectSelect(element.name);
              }}
              className={`bg-${user.secondary} w-48 p-2 rounded-2xl`}
            >
              Go To Project
            </button>
          </div>
        );
      });
      setProjectDisplays(tmp);
    }
  };

  useEffect(() => {
    displayProjects();
  }, []);

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    const id = e.currentTarget.id;
    if (error) setError(null);
    if (id === "name") setProj({ ...proj, name: e.currentTarget.value });
    if (id === "desc") setProj({ ...proj, desc: e.currentTarget.value });
    if (id === "pwd") setProj({ ...proj, pwd: e.currentTarget.value });
    if (id === "pwd2") setProj({ ...proj, pwd2: e.currentTarget.value });
  };

  const handleCreateProject = async (e: React.FormEvent) => {
    e.preventDefault();

    setError(
      VarifySub.varifyCreateProject(proj.name, proj.desc, proj.pwd, proj.pwd2)
    );

    if (!error) {
      const isReg = await CreateProject(proj);
      if (typeof isReg === "string") {
        setError(isReg);
      } else if (typeof isReg === "boolean") {
        setCreatPage(false);
        displayProjects();
      }
    }
  };

  return (
    <>
      {!createPage && !project && (
        <div className="grid grid-cols-2 gap-5 p-5 grid-rows-2 h-full">
          <div className={`bg-${user.primary} col-span-2 overflow-y-scroll`}>
            <button
              onClick={() => {
                setCreatPage(true);
              }}
              className={`bg-${user.secondary} rounded-md p-2`}
            >
              Create Project
            </button>
            <button
              onClick={() => {
                setJoinProjectDisplay(true);
              }}
              className={`bg-${user.secondary} rounded-md p-2`}
            >
              Join Project
            </button>
            {JoinProjectDisplay && (
              <div
                onClick={() => {
                  setJoinProjectDisplay(false);
                }}
                className="h-screen w-screen absolute inset-0 grid justify-center items-center filter backdrop-blur-sm"
              >
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                  className="ml-40 bg-black w-96 h-1/3  rounded-3xl"
                >
                  {joinError && <h1>{joinError}</h1>}
                  <h1>Request Join</h1>
                  <button
                    onClick={() => {
                      setJoinProjectDisplay(false);
                    }}
                  >
                    Go Back
                  </button>
                  <form>
                    <input
                      type="text"
                      required
                      value={projectID}
                      onChange={(e) => {
                        if (joinError) setJoinError(null);
                        setProjectID(e.target.value);
                      }}
                      placeholder="Project ID"
                    />
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        handleProjectJoin();
                      }}
                    >
                      Send
                    </button>
                  </form>
                </div>
              </div>
            )}
            <div className={`grid grid-cols-1 p-10`}>{projectDisplays}</div>
          </div>
        </div>
      )}
      {createPage && !project && (
        <div className="grid grid-cols-2 gap-5 p-5 grid-rows-2 h-full">
          <div className="bg-stone-900 col-span-2">
            {error && <h1>{error}</h1>}
            <button
              onClick={() => {
                setCreatPage(false);
              }}
              className={`bg-${user.secondary} rounded-md p-2`}
            >
              Go Back
            </button>
            <form onSubmit={handleCreateProject}>
              <input
                id="name"
                value={proj.name}
                onChange={handleChange}
                required
                type="text"
                placeholder="Project Name"
              />
              <input
                id="desc"
                value={proj.desc}
                onChange={handleChange}
                required
                type="text"
                placeholder="Description"
              />
              <input
                id="pwd"
                value={proj.pwd}
                onChange={handleChange}
                required
                type="password"
                placeholder="Password"
              />
              <input
                id="pwd2"
                value={proj.pwd2}
                onChange={handleChange}
                required
                type="password"
                placeholder="Password"
              />
              <button>Create</button>
            </form>
          </div>
        </div>
      )}
      {project && (
        <Project name={project} setProject={setProject} isAdmin={isAdmin} />
      )}
    </>
  );
};

export default Projects;
