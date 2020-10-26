//Todo write with Provider
const ApiService = {
    // actions from https://github.com/HackerNews/API
    axios: require('axios').default,
    endpoint:'https://hacker-news.firebaseio.com/v0/',

   
    getListOfStories: async function() {
        return await this.axios({
          method: 'get',
          url: `${this.endpoint}topstories.json` + `?print=pretty`,
        })
    },
      
    getStory: async function(id: number) {
        return await this.axios({
            method: 'get',
            url: `${this.endpoint}item/` + id + `.json?print=pretty`,
        })
    }, 
    
    getComment: async function(id:number){
        return await this.axios({
            method: 'get',
            url: `${this.endpoint}item/` + id + `.json?print=pretty`,
        })
    }
}
export default ApiService;