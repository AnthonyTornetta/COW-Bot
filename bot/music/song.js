module.exports = class Song
{
    /**
     * 
     * @param {string} name 
     * @param {string} author
     * @param {number} duration in seconds
     * @param {string} url
     */
    constructor(name, author, duration, url)
    {
        this.name = name;
        this.author = author;
        this.duration = duration;
        this.url = url;
    }

    format()
    {
        return `${this.name} - ${this.author} (${~~(this.duration / 60)}:${this.duration % 60 < 10 ? `0${this.duration % 60}` : this.duration % 60})`;
    }
}