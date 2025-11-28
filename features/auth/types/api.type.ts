import { ApiResponse } from "types/general.type";

export type PostMailTakenResponse = Omit<ApiResponse<void>, "success"> & { success: true };

export type PostMailTakenError = {
    success: false;
    message: string;
    code: number | undefined;
};