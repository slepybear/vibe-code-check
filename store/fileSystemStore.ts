import { create } from 'zustand';
import { ProjectMode, ProjectFile, SingleFileTemplate, MultiFileTemplate, BuiltInImage } from '@/types';

interface FileSystemState {
  mode: ProjectMode;
  files: ProjectFile[];
  selectedFiles: string[];
  activeFilePath: string | null;
  initialFiles: ProjectFile[];
}

interface FileSystemActions {
  setMode: (mode: ProjectMode) => void;
  initializeFromProblem: (template: SingleFileTemplate | MultiFileTemplate, mode: ProjectMode, images?: BuiltInImage[]) => void;
  createFile: (file: ProjectFile) => void;
  readFile: (path: string) => ProjectFile | undefined;
  updateFile: (path: string, content: string) => void;
  deleteFile: (path: string) => void;
  selectFile: (path: string, multiSelect?: boolean) => void;
  deselectFile: (path: string) => void;
  clearSelection: () => void;
  setActiveFile: (path: string | null) => void;
  resetFiles: () => void;
  getActiveFile: () => ProjectFile | undefined;
  getFileByPath: (path: string) => ProjectFile | undefined;
}

export const useFileSystemStore = create<FileSystemState & FileSystemActions>((set, get) => ({
  mode: ProjectMode.SINGLE_FILE,
  files: [],
  selectedFiles: [],
  activeFilePath: null,
  initialFiles: [],

  setMode: (mode: ProjectMode) => {
    set({ mode });
  },

  initializeFromProblem: (template: SingleFileTemplate | MultiFileTemplate, mode: ProjectMode, images?: BuiltInImage[]) => {
    let files: ProjectFile[] = [];
    
    if (mode === ProjectMode.SINGLE_FILE) {
      const singleFileTemplate = template as SingleFileTemplate;
      files = [
        { path: 'index.html', content: singleFileTemplate.html || '', language: 'html' },
        { path: 'styles.css', content: singleFileTemplate.css || '', language: 'css' },
        { path: 'script.js', content: singleFileTemplate.js || '', language: 'javascript' }
      ];
    } else {
      const multiFileTemplate = template as MultiFileTemplate;
      files = multiFileTemplate.files || [];
    }
    
    if (images && images.length > 0) {
      images.forEach(img => {
        files.push({
          path: img.path,
          content: img.content,
          language: 'image'
        });
      });
    }
    
    set({
      mode,
      files,
      initialFiles: [...files],
      selectedFiles: [],
      activeFilePath: files.length > 0 ? files[0].path : null
    });
  },

  createFile: (file: ProjectFile) => {
    set((state) => {
      const existingFile = state.files.find(f => f.path === file.path);
      if (existingFile) {
        return state;
      }
      return {
        files: [...state.files, file]
      };
    });
  },

  readFile: (path: string) => {
    return get().files.find(f => f.path === path);
  },

  updateFile: (path: string, content: string) => {
    set((state) => ({
      files: state.files.map(file =>
        file.path === path ? { ...file, content } : file
      )
    }));
  },

  deleteFile: (path: string) => {
    set((state) => {
      const newFiles = state.files.filter(f => f.path !== path);
      let newActiveFilePath = state.activeFilePath;
      let newSelectedFiles = state.selectedFiles.filter(p => p !== path);
      
      if (state.activeFilePath === path) {
        newActiveFilePath = newFiles.length > 0 ? newFiles[0].path : null;
      }
      
      return {
        files: newFiles,
        activeFilePath: newActiveFilePath,
        selectedFiles: newSelectedFiles
      };
    });
  },

  selectFile: (path: string, multiSelect: boolean = false) => {
    set((state) => {
      if (multiSelect) {
        const isSelected = state.selectedFiles.includes(path);
        return {
          selectedFiles: isSelected
            ? state.selectedFiles.filter(p => p !== path)
            : [...state.selectedFiles, path]
        };
      } else {
        return {
          selectedFiles: [path],
          activeFilePath: path
        };
      }
    });
  },

  deselectFile: (path: string) => {
    set((state) => ({
      selectedFiles: state.selectedFiles.filter(p => p !== path)
    }));
  },

  clearSelection: () => {
    set({ selectedFiles: [] });
  },

  setActiveFile: (path: string | null) => {
    set({ activeFilePath: path });
  },

  resetFiles: () => {
    set((state) => ({
      files: [...state.initialFiles],
      selectedFiles: [],
      activeFilePath: state.initialFiles.length > 0 ? state.initialFiles[0].path : null
    }));
  },

  getActiveFile: () => {
    const state = get();
    return state.files.find(f => f.path === state.activeFilePath);
  },

  getFileByPath: (path: string) => {
    return get().files.find(f => f.path === path);
  }
}));
