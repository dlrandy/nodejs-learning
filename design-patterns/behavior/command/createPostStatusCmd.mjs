export const createPostStatusCmd = (service, status) => {
    let postId = null;

    // command

    return {
        run() {
            postId = service.postUpdate(status);
        },
        undo() {
            if (postId) {
                service.destroyUpdate(postId);
                postId = null;
            }
        },
        serialize() {
            return {
                type: 'status',
                action: 'post',
                status,
            };
        },
    };
};
