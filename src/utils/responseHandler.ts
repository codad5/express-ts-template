import { AllResponseDatas, ErrorResponseData, NewResponse , ServerErrorResponse, SeverResponseData, SuccessResponseDatas} from "src/types/response";
import { Response } from "express";
class ReponseHandler{
    private response : Response;

    public tieResponse(req: any, res: Response, next: any) {
        this.response = res;
        next();
    }

    private json(success: boolean, data: AllResponseDatas, message?: string, code?: number): NewResponse<AllResponseDatas> {
        if (success) return {
                success: true,
                code: code ?? 200,
                message: message ?? "",
                data: data,
            };
        return {
            success: false,
            code: code ?? 400,
            message: message ?? "",
            recivedData: undefined,
            data: data,
        };
    }


    public successJson(data: SuccessResponseDatas, message?: string, code?: number): NewResponse<SuccessResponseDatas>
    {
        return this.json(true, data, message, code) as NewResponse<SuccessResponseDatas>;
    }
    
    public errorJson(data: ErrorResponseData, message?: string, code?: number): NewResponse<ErrorResponseData>
    {
        return this.json(false, data, message, code ?? 400) as NewResponse<ErrorResponseData>;
    }
    
    public serverErrorJson(data: SeverResponseData, message?: string, code?: number): NewResponse<ServerErrorResponse>
    {
        return this.json(false, data, message ?? "server Error", code ?? 500) as NewResponse<ServerErrorResponse>;
    }

    public send(data: NewResponse<AllResponseDatas>): void{
        this.response.status(data.code ?? 200).json(data);
    }
    public sendSuccess(data: SuccessResponseDatas, message?: string, code?: number): void{
        this.response.status(code ?? 200).json(this.successJson(data, message, code));
    }
    public sendError(data: ErrorResponseData, message?: string, code?: number): void{
        this.response.status(code ?? 400).json(this.errorJson(data, message, code));
    }
    public sendServerError(data: SeverResponseData, message?: string, code?: number): void{
        this.response.status(code ?? 500).json(this.serverErrorJson(data, message, code));
    }
}

export default new ReponseHandler