export interface captchaResponse {
    success: boolean,
    challenge_ts: timestamp, 
    hostname: string,         
    errorCodes?: string[]        
}