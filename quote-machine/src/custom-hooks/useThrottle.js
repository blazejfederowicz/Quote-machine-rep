const useThrottle = (func, delay) => {
    let timeout = null;

    return (...args) => {
        if (!timeout) {
            console.log('Throttled function executed');
            func(...args);
            timeout = setTimeout(() => {
                console.log('Throttle timeout cleared');
                timeout = null;
            }, delay);
        }else {
            console.log('Throttled function call ignored');
        }
    };
};

export default useThrottle;