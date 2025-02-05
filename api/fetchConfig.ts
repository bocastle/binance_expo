class ApiClient {
  private baseUrl: string;
  private headers: HeadersInit;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
    this.headers = { "Content-Type": "application/json" };
  }

  async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      headers: this.headers,
      ...options,
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    return response.json();
  }

  get<T>(endpoint: string) {
    return this.request<T>(endpoint);
  }
}

export const apiClient = new ApiClient(`${process.env.EXPO_PUBLIC_API_URL}`);
