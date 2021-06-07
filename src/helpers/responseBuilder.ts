import * as l10n from "jm-ez-l10n";
import { Constants } from "../config/constants";
import { Failure } from "./error";

export class ResponseBuilder {

  public static successMessage(msg?: string): ResponseBuilder {
    const rb: ResponseBuilder = new ResponseBuilder();
    rb.code = Constants.SUCCESS_CODE;
    rb.msg = msg;
    return rb;
  }

  public static errorMessage(msg?: any): ResponseBuilder {
    const rb: ResponseBuilder = new ResponseBuilder();
    rb.code = Constants.INTERNAL_SERVER_ERROR_CODE;
    rb.error = msg != null ? msg : l10n.t("ERR_INTERNAL_SERVER");
    return rb;
  }

  public static badRequest(msg: any): ResponseBuilder {
    const rb: ResponseBuilder = new ResponseBuilder();
    rb.code = Constants.FAIL_CODE;
    rb.error = msg;
    return rb;
  }

  public static unauthorizedRequest(msg: any): ResponseBuilder {
    const rb: ResponseBuilder = new ResponseBuilder();
    rb.code = Constants.UNAUTHORIZED_CODE;
    rb.error = msg;
    return rb;
  }

  public static data(result: any, msg?: string): ResponseBuilder {
    const rb: ResponseBuilder = new ResponseBuilder();
    rb.code = Constants.SUCCESS_CODE;
    rb.data = result;
    rb.msg = msg;
    return rb;
  }

  public static newCreatedData(result: any, msg?: string): ResponseBuilder {
    const rb: ResponseBuilder = new ResponseBuilder();
    rb.code = Constants.CREATED_SUCCESS_CODE;
    rb.data = result;
    rb.msg = msg;
    return rb;
  }

  public static dataWithPaginate(result: Json, totalCount?: number): ResponseBuilder {
    const rb: ResponseBuilder = new ResponseBuilder();
    rb.code = Constants.SUCCESS_CODE;
    rb.data = result;
    rb.totalCount = totalCount;
    return rb;
  }

  public static error(err: Failure) {
    const rb: ResponseBuilder = new ResponseBuilder();
    if (err.type === Constants.BAD_DATA) {
      rb.code = Constants.FAIL_CODE;
      rb.error = err.title;
      rb.description = err.description;
      rb.data = err.data;
      return rb;
    }
    rb.code = Constants.INTERNAL_SERVER_ERROR_CODE;
    rb.error = err.title || l10n.t("ERR_INTERNAL_SERVER");
    rb.description = err.description;
    rb.data = err.data;
    return rb;
  }
  public code: number;
  public msg: string;
  public error: string;
  public data: any;
  public description: string;
  public totalCount: number;
}
