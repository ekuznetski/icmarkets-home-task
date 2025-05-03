import axios, { AxiosRequestConfig } from 'axios'
import { urls } from './config'
import { CryptoSymbol } from '../domain/types/CryptoSymbol'

export enum RequestMethod {
  GET = 'get',
  POST = 'post',
  PUT = 'put',
  DELETE = 'delete',
}

interface RequestParams<R> {
  url: string
  data?: R
  options?: AxiosRequestConfig
  method?: RequestMethod
}

async function makeRequest<T, R = Record<string, unknown>>({
  url,
  method = RequestMethod.GET,
  data,
  options,
}: RequestParams<R>): Promise<T> {
  try {
    switch (method) {
      case RequestMethod.GET:
        return (await axios.get<T>(url, options)).data
      case RequestMethod.POST:
        return (await axios.post<T>(url, data, options)).data
      case RequestMethod.PUT:
        return (await axios.put<T>(url, data, options)).data
      case RequestMethod.DELETE:
        return (await axios.delete<T>(url, options)).data
      default:
        throw new Error('Invalid request method')
    }
  } catch (error) {
    throw new Error(
      axios.isAxiosError(error)
        ? error.response?.data?.message || error.message
        : 'Unexpected error'
    )
  }
}

export const getSymbolsRequest = () => {
  const url = urls.cryptoSymbols
  return makeRequest<CryptoSymbol[]>({
    url,
    method: RequestMethod.GET,
  })
}
