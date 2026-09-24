import type { CreateGameRequest, GameDateResponse, GameDetailsResponse } from "@/types/volleyball";
import { getApi, postApi } from "./api";

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