// ===== USER TYPES =====
export interface User {
  id: number;
  username: string;
  email: string;
  level: number;
  xp: number;
  totalXP: number;
}

export interface UserProfile extends User {
  xpToNextLevel: number;
  xpProgress: number;
  xpRequiredForNextLevel: number;
  activeHabitsCount: number;
  totalCompletions: number;
  longestStreak: number;
  currentActiveStreaks: number;
  createdAt: string;
}

export interface UserStats {
  totalCompletions: number;
  completionRate: number;
  currentStreak: number;
  longestStreakInPeriod: number;
  averageCompletionsPerDay: number;
  dailyCompletions: Record<string, number>;
  periodStart: string;
  periodEnd: string;
}

// ===== AUTH TYPES =====
export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  message: string;
  token: string;
  user: User;
}

export interface AuthResult {
  success: boolean;
  message: string;
  token?: string;
  user?: User;
}

// ===== PROFILE UPDATE TYPES =====
export interface UpdateProfileRequest {
  username?: string;
}

// ===== HABIT TYPES =====
export enum HabitFrequency {
  Daily = 1,
  Weekly = 2,
}

export enum HabitDifficulty {
  Easy = 1, // +5 XP
  Medium = 2, // +10 XP
  Hard = 3, // +20 XP
}

export interface Habit {
  id: number;
  title: string;
  description?: string;
  frequency: HabitFrequency;
  difficulty: HabitDifficulty;
  currentStreak: number;
  bestStreak: number;
  lastCompletedAt?: string;
  isActive: boolean;
  canCompleteToday: boolean;
  createdAt: string;
}

export interface CreateHabitRequest {
  title: string;
  description?: string;
  frequency: HabitFrequency;
  difficulty: HabitDifficulty;
}

export interface UpdateHabitRequest {
  title?: string;
  description?: string;
  frequency?: HabitFrequency;
  difficulty?: HabitDifficulty;
}

// ===== GAME MECHANICS TYPES =====
export interface GameReward {
  success: boolean;
  message: string;
  xpGained: number;
  leveledUp: boolean;
  newLevel: number;
  newXp: number;
  newTotalXp: number;
  newStreak: number;
  updatedHabit: Habit;
}

// ===== API RESPONSE TYPES =====
export interface ApiResponse<T = any> {
  data?: T;
  message?: string;
  success?: boolean;
}

export interface ApiError {
  message: string;
  status?: number;
}

// ===== UTILITY TYPES =====
export interface PaginatedResponse<T> {
  data: T[];
  totalCount: number;
  pageSize: number;
  currentPage: number;
  totalPages: number;
}

// ===== UI TYPES =====
export interface LoadingState {
  isLoading: boolean;
  error?: string;
}

export interface FormValidation {
  isValid: boolean;
  errors: Record<string, string>;
}

// ===== CONSTANTS TYPES =====
export interface DifficultyConfig {
  label: string;
  xp: number;
  color: string;
  icon: string;
}

export interface FrequencyConfig {
  label: string;
  icon: string;
}

// ===== BULK OPERATIONS TYPES =====
export interface BulkDeleteRequest {
  habitIds: number[];
  isPermanent: boolean;
  confirmationText?: string;
}

export interface BulkRestoreRequest {
  habitIds: number[];
}

export interface BulkOperationResult {
  message: string;
  affectedCount: number;
  notFound?: number[];
}

// ===== DELETE OPERATION TYPES =====
export interface PermanentDeleteRequest {
  confirmationText: string;
}