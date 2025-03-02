
export type PlatformData = Record<string, Record<string, any>>;

export interface DemoResult {
  originalRequest: any;
  transformedRequest: any;
  magentoResponse: any;
  platformResponse: any;
}
