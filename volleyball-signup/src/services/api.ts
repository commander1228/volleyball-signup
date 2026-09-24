const apiUrl = import.meta.env.VITE_API_URL

async function readJsonResponse<T>(response: Response): Promise<T> {
  const responseBody = await response.text()

  if (!responseBody.trim()) {
    return undefined as T
  }

  return JSON.parse(responseBody) as T
}

export async function getApi<T>(path: string): Promise<T> {
  const response = await fetch(`${apiUrl}${path}`)

  if (!response.ok) {
    throw new Error(`Request failed: ${response.status}`)
  }

  return readJsonResponse<T>(response)
}

export async function postApi<TResponse, TBody>(
  path: string,
  body: TBody,
): Promise<TResponse> {
  const response = await fetch(`${apiUrl}${path}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })

  if (!response.ok) {
    throw new Error(`Request failed: ${response.status}`)
  }

  return readJsonResponse<TResponse>(response)
}

export async function deleteApi<TResponse>(path: string): Promise<TResponse> {
  const response = await fetch(`${apiUrl}${path}`, {
    method: 'DELETE',
  })

  if (!response.ok) {
    throw new Error(`Request failed: ${response.status}`)
  }

  return readJsonResponse<TResponse>(response)
}

export async function putApi<TResponse,TBody>(
  path:string,
  body:TBody,
): Promise<TResponse> {
  const response = await fetch(`${apiUrl}${path}`,{
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })

  if (!response.ok) {
    throw new Error(`Request failed: ${response.status}`)
  }

  return readJsonResponse<TResponse>(response)
}