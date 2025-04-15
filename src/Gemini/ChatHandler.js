const chatHandler = async (prompt) => {
    try {
      const res = await fetch('https://geminibackend-4dzq.onrender.com/chat', {
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
  