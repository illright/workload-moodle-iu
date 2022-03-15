import { persistentWritable, localStorageAdapter } from 'svelte-persistent-writable';
import {
  BinningMode,
  CountMode,
} from '@/shared/api';

interface InstructorPreferences {
  highlightThisCourse: boolean;
  binningMode: BinningMode;
  assignmentCountMode: CountMode;
}

export const preferences = persistentWritable<InstructorPreferences>(
  {
    highlightThisCourse: false,
    binningMode: BinningMode.span,
    assignmentCountMode: CountMode.max,
  },
  {
    storage: localStorageAdapter('study-workload:preferences'),
  }
);
