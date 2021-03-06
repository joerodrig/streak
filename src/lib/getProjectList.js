// Maps userId to project list
import ProjectList from './project-list/ProjectList.js';

const projectsByUser = new Map();

/**
 * Returns public projects for a given user
 */
export default function getProjectList(userId) {
  const cachedList = projectsByUser.get(userId);
  if (cachedList) return cachedList;

  const projectList = new ProjectList(userId);
  projectList.load();

  projectsByUser.set(userId, projectList);

  return projectList;
}

