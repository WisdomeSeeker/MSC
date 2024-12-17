import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Project, Task } from '../../types/project';

interface ProjectState {
  projects: Project[];
  selectedProject: Project | null;
  projectTasks: Record<string, Task[]>;
  loading: boolean;
  error: string | null;
}

const initialState: ProjectState = {
  projects: [],
  selectedProject: null,
  projectTasks: {},
  loading: false,
  error: null,
};

const projectSlice = createSlice({
  name: 'project',
  initialState,
  reducers: {
    setProjects: (state, action: PayloadAction<Project[]>) => {
      state.projects = action.payload;
      state.loading = false;
      state.error = null;
    },
    setSelectedProject: (state, action: PayloadAction<Project>) => {
      state.selectedProject = action.payload;
    },
    setProjectTasks: (state, action: PayloadAction<{ projectId: string; tasks: Task[] }>) => {
      state.projectTasks[action.payload.projectId] = action.payload.tasks;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const {
  setProjects,
  setSelectedProject,
  setProjectTasks,
  setLoading,
  setError,
  clearError,
} = projectSlice.actions;

export default projectSlice.reducer;
