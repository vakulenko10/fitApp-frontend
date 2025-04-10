export const getCookie = vi.fn((name) => {
    if (name === "token") return " eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI5OWVjMTQzNy02NjkyLTQ3ZDAtOGNmNy1iODE3MmU2YjUwZTIiLCJ1c2VybmFtZSI6Imdvc2hhIiwiaWF0IjoxNzQ0Mjk3NjA4LCJleHAiOjE3NDQzMDEyMDh9.43FPYFJS-1YKUlIDFem1mYMJuWUtthrNjbOPCvhYIJU"; 
    return '';
  });
 