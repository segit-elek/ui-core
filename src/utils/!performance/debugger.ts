import _ from 'lodash';

export namespace Debugger {
  let data: any[] = [];
  // initialized at the fist store
  let timestamp: { [id: string]: number } = {};

  let events: { [key: string]: any[] } = {};

  // let timeouts: { [id: string]: any } = {};

  window.addEventListener('beforeunload', () => {
    events = {};
    data = [];
    // timeouts = {};
  });

  /**
   * It's async so the caller shouldn't have to wait to the function
   * @param {{name: string, component: string, element: HTMLElement, id: string, timestamp?: number}} value
   * @return {Promise<void>}
   */
  export async function store(value: {
    name: string;
    component: string;
    element: HTMLElement;
    id: string;
    timestamp?: number;
  }): Promise<void> {
    if (!timestamp[value.id]) {
      timestamp[value.id] = performance.now();
    }
    if (process.env.NODE_ENV === 'development') {
      value.timestamp = performance.now() - timestamp[value.id];

      // if (value.element) {
      //   if (value.name === 'componentWillRender' && !timeouts[value.id]) {
      //     timeouts[value.id] = setTimeout(() => {
      //       console.log('Slow render', value.component, value.element, events[value.id]);
      //     }, 5000);
      //   }
      //   if (value.name === 'componentDidRender' || value.name === 'componentDidLoad') {
      //     clearTimeout(timeouts[value.id]);
      //   }
      // }

      if (data.length > 0) {
        const prev = data[data.length - 1];
        const time = value.timestamp - prev.timestamp;
        if (time > 20) {
          console.log('### long wait', time);
          console.log('start', prev.timestamp);
          console.log('end', value.timestamp);
          console.log('prev', prev);
          console.log('prev timestamp', prev.timestamp + timestamp[value.id]);
          console.log('prev timestamp delta', prev.timestamp);
          console.log('current', value);
          console.log('current timestamp', value.timestamp + timestamp[value.id]);
          console.log('current timestamp delta', value.timestamp);
        }
      }
      events[value.id] = events[value.id] || [];
      events[value.id].push(value);

      if (value.name === 'render finished') {
        console.log(value);
      }
      if (value.name === 'componentDidRender' && value.component === 'EuiDataTable') {
        console.log(value);
      }
    }
  }

  export function get(): any {
    const groups = _.groupBy(data, 'component');

    let temp: any = {};

    Object.entries(groups).forEach(([key, value]: [string, any[]]) => {
      temp[key] = {
        min: _.min(value.map((i) => i.timestamp)),
        max: _.max(value.map((i) => i.timestamp)),
        items: {},
      };

      const x = _.groupBy(value, 'name');

      Object.entries(x).forEach(([innerKey, innerValue]: [string, any[]]) => {
        temp[key].items[innerKey] = {
          min: _.min(innerValue.map((i) => i.timestamp)),
          max: _.max(innerValue.map((i) => i.timestamp)),
          items: innerValue,
        };
      });
    });

    return temp;

    // return data.map((item: any) => {
    //   return (
    //     'Component: ' + item.component + ' Method: ' + item.name + ' Time: ' + item.timestamp + 'ms'
    //   );
    // });
  }
}
