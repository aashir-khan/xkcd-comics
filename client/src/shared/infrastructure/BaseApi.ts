/* eslint-disable max-classes-per-file */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Either, Right, Left } from 'purify-ts/Either';

import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { setupCache } from 'axios-cache-adapter';

// this type represents anything else besides the network url
// the user of the BaseApi class wishes to pass in to the various
// utility functions
export type FunctionExtraParameters = {
  data?: any;
  params?: any;
};

export type FailedApiResponse = { status?: number; message?: string };
type SuccessfulApiResponse<T> = { data: T; status: number };

// this type represents what gets returned by the various utility
// functions, either being an error, or successful data retrieved
export type ApiResponse<T = any> = Either<
  FailedApiResponse,
  SuccessfulApiResponse<T>
>;

export abstract class IBaseAPI {
  abstract get<T = any>(
    url: string,
    extraParameters?: FunctionExtraParameters
  ): Promise<ApiResponse<T>>;

  abstract post<T = any>(
    url: string,
    extraParameters?: FunctionExtraParameters
  ): Promise<ApiResponse<T>>;

  abstract put<T = any>(
    url: string,
    extraParameters?: FunctionExtraParameters
  ): Promise<ApiResponse<T>>;

  abstract delete<T = any>(
    url: string,
    extraParameters?: FunctionExtraParameters
  ): Promise<ApiResponse<T>>;
}

export class BaseAPI implements IBaseAPI {
  axiosInstance: AxiosInstance;

  constructor(baseUrl: string) {
    // setup caching adapter for axios
    const cache = setupCache({
      // value is respresented in milliseconds
      maxAge: 15 * 60 * 1000,
    });

    this.axiosInstance = axios.create({
      adapter: cache.adapter,
      baseURL: baseUrl,
    });
  }

  async get<T = any>(
    url: string,
    { params }: FunctionExtraParameters = {}
  ): Promise<ApiResponse<T>> {
    try {
      const res = await this.axiosInstance({
        method: 'GET',
        url,
        params,
      });

      return this.getData(res);
    } catch (error) {
      return this.getError(error);
    }
  }

  async post<T = any>(
    url: string,
    { data: _data, params }: FunctionExtraParameters = {}
  ): Promise<ApiResponse<T>> {
    try {
      const res = await this.axiosInstance({
        method: 'POST',
        url,
        data: _data,
        params,
      });

      return this.getData(res);
    } catch (error) {
      return this.getError(error);
    }
  }

  async put<T = any>(
    url: string,
    { data: _data }: FunctionExtraParameters = {}
  ): Promise<ApiResponse<T>> {
    try {
      const res = await this.axiosInstance({
        method: 'PUT',
        url,
        data: _data,
      });

      return this.getData(res);
    } catch (error) {
      return this.getError(error);
    }
  }

  async delete<T = any>(
    url: string,
    { data: _data }: FunctionExtraParameters = {}
  ): Promise<ApiResponse<T>> {
    try {
      const res = await this.axiosInstance({
        method: 'DELETE',
        url,
        data: _data,
      });

      return this.getData(res);
    } catch (error) {
      return this.getError(error);
    }
  }

  // helper function to extract relevant fields from response
  protected getData<T>(res: AxiosResponse<T>): ApiResponse<T> {
    const { data, status } = res;
    return Right({ data, status });
  }

  // helper function to extract relevant fields from error
  protected getError(error: any): ApiResponse {
    // eslint-disable-next-line no-debugger
    if (error.response) return Left({ status: error.response.status });
    return Left({ message: error.message });
  }
}
