import { customRef } from "vue";
import { Message } from "@arco-design/web-vue"; 

export function debounceRef(value, delay=2000) {
    return customRef((track, trigger) => {
        let timer;
        return {
            get() {
                track();
                return value;
            },
            set(newValue) {
                clearTimeout(timer);
                timer = setTimeout(() => {
                    value = newValue;
                    trigger();
                }, delay);
            },
        };
    });
}


export function throttle(func, delay) {
    let lastTime = 0;
    return function(...args) {
        const now = Date.now();
        if (now - lastTime >= delay) {
            lastTime = now;
            func.apply(this, args);
        }
    };
}

// Generic function to handle API calls
export async function fetchData  (fetchFunction, successCallback, errorCallback = null)  {
    try {
      const {data, msg} = await fetchFunction();
      successCallback(data, msg);
    } catch (err) {
      const {response} = err
      if (errorCallback) {
        errorCallback(err);
      } else {
        // Default error handling
        console.error(err);
      }
    } finally {
      // Final block to be executed
    }
  };

  export function replaceValues(data, value) {
    if (typeof data === "object" && data !== null) {
      for (const key in data) {
        if (data.hasOwnProperty(key)) {
          if (key === value) {
            return data[key]; // 返回找到的值
          }
          const result = replaceValues(data[key], value); // 递归调用
          if (result !== undefined) {
            return result; // 如果找到值则返回
          }
        }
      }
    }
    return undefined; // 如果没有找到值则返回 undefined
  }
  

