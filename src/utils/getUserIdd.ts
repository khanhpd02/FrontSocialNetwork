
const base64UrlDecode = (base64Url: any) => {
        const base64 = base64Url.replace("-", "+").replace("_", "/");
        return atob(base64);
      };
    
      const decodeToken = (token: any) => {
        const [header, payload, signature] = token.split(".");
        const decodedHeader = JSON.parse(base64UrlDecode(header));
        const decodedPayload = JSON.parse(base64UrlDecode(payload));
    
        return {
          header: decodedHeader,
          payload: decodedPayload,
          signature: signature,
        };
      };
      const tokenDecode = localStorage.getItem("token") || "";
      const idToken = decodeToken(tokenDecode)
export const UserId = idToken.payload.id;
    
    