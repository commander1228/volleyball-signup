import type { CreateGameRequest, CreatePlayerRequest, GameDateResponse, GameDetailsResponse, PlayerResponse, UpdateAttendanceRequest } from "@/types/volleyball";
import { getApi, postApi, putApi } from "./api";

export async function createGame(createGameRequest: CreateGameRequest){
    const result = await postApi('/api/volleyball/game', createGameRequest);
    }


export async function getGameDates(): Promise<GameDateResponse[]>{
    const result = await getApi<GameDateResponse[]>('/api/volleyball/game');
    return result;
}

export async function getGameDetails(gameId: number): Promise<GameDetailsResponse> {
    return getApi<GameDetailsResponse>(`/api/volleyball/game/${gameId}`);
}

export async function addPlayer(createPlayerRequest: CreatePlayerRequest) {
    return postApi<PlayerResponse, CreatePlayerRequest>('/api/volleyball/player',createPlayerRequest);
}

export async function changePlayerAttendance(updateAttendanceRequest: UpdateAttendanceRequest){
    return putApi('/api/volleyball/attendance',updateAttendanceRequest); 
}