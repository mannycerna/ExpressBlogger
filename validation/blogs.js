

const validateBlogData = (blogData) => {

    if (blogData.title === undefined || typeof(blogData.title) !== "string" || blogData.title.length > 40) {
        //title is required and must be a string
        return {
            isValid: false,
            message: "Title is required, it must be a string with a max length of 40 characters including whitespaces"
        }
    }

    if(blogData.text === undefined || typeof(blogData.text) !== "string") {
        //text is required and must be a string
        return {
            isValid: false,
            message: "Text is required and it must be in strings"
        }
    }

    if(blogData.author === undefined || typeof(blogData.author) !== "string" || blogData.author.length > 40){ 
        //author is required and must be a string
        return {
            isValid: false,
            message: "Author is required and it must be a string with a max length of 40 characters including whitespaces"
        }
    }

    const nonStringCategories = blogData.category.filter((category) => {

        if(typeof(category) !== 'string') {
            return true;
        } else {
            return false;
        }
    })

    console.log("nonStringCategories", nonStringCategories);

    if (nonStringCategories.length > 0){
        return {
            isValid: false,
            message: "categories must be an array of strings"
        }
    }

    return {
        isValid: true
    }
}

module.exports = {
    validateBlogData
}

