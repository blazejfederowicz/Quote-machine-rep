const useThrottle = (func, delay) => {
    let timeout = null;

    return (...args) => {
        if (!timeout) {
            func(...args);
            timeout = setTimeout(() => {
                timeout = null;
            }, delay);
        }else {
            console.log('Throttled function call ignored');
        }
    };
};

export default useThrottle;