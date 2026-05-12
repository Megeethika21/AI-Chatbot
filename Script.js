async function generateResponse(input) {

  try {

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${AIzaSyAnIAgE7T7K72FWQuNRhU5ObOedtkv2zTg}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: input
                }
              ]
            }
          ]
        })
      }
    );

    const data = await response.json();

    console.log(data);

    // CHECK FOR API ERRORS
    if (data.error) {
      return data.error.message;
    }

    return data.candidates[0].content.parts[0].text;

  } catch (error) {

    console.log(error);

    return "Error generating response.";
  }
}
