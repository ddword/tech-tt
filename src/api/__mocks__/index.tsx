const range = (n: number) => [...Array(n).keys()];

const fetchStories = () => {
  return new Promise<any>((resolve) =>
    setTimeout(() => {
      resolve({
        response: {
          results: range(10).map(i => ({
            webUrl: `https://abc${i}.com`,
            webTitle: `Some Title ${i}`
          }))
        }
      }); 
    }, 200 + Math.random()*300)   
  );
};

export default fetchStories;
