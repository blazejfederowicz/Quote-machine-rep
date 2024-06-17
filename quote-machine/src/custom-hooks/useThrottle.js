const useThrottle = (func, delay) => {
    let timeout = null;

    return (...args) => {
        if (!timeout) {
            func(...args);
            timeout = setTimeout(() => {
                timeout = null;
            }, delay);
        }
    };
};

export default useThrottle;