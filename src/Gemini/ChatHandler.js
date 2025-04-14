const chatHandler = async (prompt) => {
    try {
      const res = await fetch('http://localhost:4000/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ promt: prompt }),
      });
  
      const data = await res.json();
      return Array.isArray(data) ? data.join(' ') : data;
    } catch (error) {
      return 'Something went wrong!';
    }
  };
  
  export default chatHandler;
  