export class IResult {
  [key: string]: string | number;
}
export class IResponse {
  status: boolean;
  url: string;
  method: string;
  timestamp: string;
  result: Array<IResult> | IResult | string | number;
}
