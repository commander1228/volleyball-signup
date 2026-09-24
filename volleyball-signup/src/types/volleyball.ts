export type Gender = "MALE" | "FEMALE";

export type Attendance =
  | "UNDECIDED"
  | "NOT_GOING"
  | "MAYBE"
  | "GOING";

// POST /api/volleyball/game
export interface CreateGameRequest {
  opponent: string;
  court: number;
  gameTime: string;
  gameDate: string;
}

// POST /api/volleyball/player
export interface CreatePlayerRequest {
  name: string;
  gender: Gender;
}

// PUT /api/volleyball/attendance
export interface UpdateAttendanceRequest {
  attendance: Attendance;
  playerId: number;
  gameId: number;
}

// POST /api/volleyball/game response
export interface GameResponse {
  id: number;
  opponent: string;
  court: number;
  gameTime: string;
  gameDate: string;
}

// POST /api/volleyball/player response
export interface PlayerResponse {
  id: number;
  name: string;
  gender: Gender;
}

// One player entry within game details
export interface PlayerAttendanceResponse {
  playerId: number;
  playerName: string;
  gender: Gender;
  attendanceStatus: Attendance;
}

// GET /api/volleyball/game/:id response
export interface GameDetailsResponse {
  id: number;
  opponent: string;
  court: number;
  gameTime: string;
  gameDate: string;
  players: PlayerAttendanceResponse[];
}
