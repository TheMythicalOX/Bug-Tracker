import { useState } from "react";
import VarifySub from "../API/VarifySub";
import CreateProject, { ProjectSub } from "../API/CreateProject";

const Projects = () => {
  const [createPage, setCreatPage] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [proj, setProj] = useState<ProjectSub>({
    name: "",
    desc: "",
    pwd: "",
    pwd2: "",
  });

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
      }
    }
  };

  return (
    <>
      {!createPage && (
        <div className="grid grid-cols-2 gap-5 p-5 grid-rows-2 h-full">
          <div className="bg-stone-900 col-span-2">
            <button
              onClick={() => {
                setCreatPage(true);
              }}
              className="bg-black hover:bg-gray-950 rounded-md p-2"
            >
              Create Project
            </button>
          </div>
          <div className="bg-stone-900">Projects</div>
          <div className="bg-stone-900">Projects</div>
        </div>
      )}
      {createPage && (
        <div className="grid grid-cols-2 gap-5 p-5 grid-rows-2 h-full">
          <div className="bg-stone-900 col-span-2">
            {error && <h1>{error}</h1>}
            <button
              onClick={() => {
                setCreatPage(false);
              }}
              className="bg-black hover:bg-gray-950 rounded-md p-2"
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
          <div className="bg-stone-900">Projects</div>
          <div className="bg-stone-900">Projects</div>
        </div>
      )}
    </>
  );
};

export default Projects;
