interface ValidationMessage {
	type: string;
	message: string;
	lastLine: number;
	lastColumn: number;
  }
  
  interface ValidationResponse {
	messages: ValidationMessage[];
  }
  
  export const validateHtml = async (html: string): Promise<ValidationResponse> => {
	const validatorUrl = 'https://validator.w3.org/nu/?out=json';
  
	try {
	  const response = await fetch(validatorUrl, {
		method: 'POST',
		headers: {
		  'Content-Type': 'text/html; charset=utf-8',
		},
		body: html,
	  });
  
	  if (!response.ok) {
		throw new Error(`HTTP error! status: ${response.status}`);
	  }
  
	  const data: ValidationResponse = await response.json();
	  return data;  // Return the JSON response
	} catch (error) {
	  	console.error('Error validating HTML:', error);
	  throw error;  // Rethrow the error for the caller to handle
	}
  };