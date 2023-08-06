export default class Tracker {
  static LOCAL_STORAGE_DATA_KEY = 'recent-workout-entries';
  
  constructor(root) {
    this.root = root;
    this.root.insertAdjacentHTML('afterbegin', Tracker.html());
    this.entries = [];

    this.loadEntries();
    this.updateView();

    
    this.root.querySelector('.tracker__add').addEventListener('click', () => {
      const date = new Date();
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const day = date.getDate().toString().padStart(2, '0');

      this.addEntry({
        date:`${year}-${month}-${day}`,
        workout: "running",
        feeling: "great",
        duration: 30
      })
    });
  }

  static html() {
    return `
      <table class="tracker w-full bg-slate-100">
        <thead>
          <tr>
            <th class="p-5 text-lg font-semibold tracking-wider text-left">Date</th>
            <th class="p-5 text-lg font-semibold tracking-wider text-left">Exercise</th>
            <th class="p-5 text-lg font-semibold tracking-wider text-left whitespace-nowrap">How'd it go?</th>
            <th class="p-5 text-lg font-semibold tracking-wider text-left">Duration</th>
            <th></th>
          </tr>
        </thead>
        <tbody class="tracker__entries divide-y divide-slate-100"></tbody>
        <tbody>
          <tr class="tracker__row tracker__row--add border-t-2 border-b-2 border-slate-200 bg-slate-100 text-green-600 font-semibold">
            <td colspan="5" class="p-5 text-lg text-right">
              <button class="tracker__add rounded-lg py-1 px-2 hover:bg-green-200">Add Entry <span class="text-xl">&plus;</span></button>
            </td>
          </tr>
        </tbody>
      </table>
    `;
  }

  static rowHtml() {
    return `
      <tr class="tracker__row odd:bg-slate-200 even:bg-slate-100">
      <td class="p-5 text-md whitespace-nowrap">
        <input type="date" class="tracker__date p-1 bg-inherit focus:outline-none rounded-md hover:cursor-pointer">
      </td>
      <td class="p-5 text-md whitespace-nowrap">
        <select class="tracker__workout p-1 bg-inherit focus:outline-none rounded-md hover:cursor-pointer">
          <option value="upper-body">Upper Body Strength Training</option>
          <option value="lower-body">Lower Body Strength Training</option>
          <option value="running">Running</option>
          <option value="cycling">Cycling</option>
          <option value="swimming">Swimming</option>
          <option value="stretching">Stretching</option>
          <option value="yoga">Yoga</option>
        </select>
      </td>
      <td class="p-5 text-md whitespace-nowrap">
        <select class="tracker__feeling p-1 bg-inherit focus:outline-none rounded-md hover:cursor-pointer">
          <option value="great">Great</option>
          <option value="good">Good</option>
          <option value="okay">Okay</option>
          <option value="poor">Poor</option>
          <option value="awful">Awful</option>
        </select>
      </td>
      <td class="p-5 text-md whitespace-nowrap">
        <input type="number" class="tracker__duration mr-1 w-11 text-right p-1 bg-inherit focus:outline-none rounded-md hover:cursor-pointer">
        <span class="tracker__text">minutes</span>
      </td>
      <td class="p-5 text-md whitespace-nowrap">
        <button type="button" class=" p-0.5 tracker__button tracker__delete font-semibold text-xl uppercase rounded-full text-red-800 hover:bg-red-200">&nbsp;&nbsp;&nbsp;&times;&nbsp;&nbsp;&nbsp;</button>
      </td>
    </tr>
    `;
  }

  loadEntries() {
    this.entries = JSON.parse(localStorage.getItem(Tracker.LOCAL_STORAGE_DATA_KEY) || "[]");
  }

  saveEntries() {
    localStorage.setItem(Tracker.LOCAL_STORAGE_DATA_KEY, JSON.stringify(this.entries));
  }

  updateView() {
    const tableBody = this.root.querySelector('.tracker__entries');
    
    const addRow = data => {
      const template = document.createElement('template');
      let row = null;

      template.innerHTML = Tracker.rowHtml().trim();
      row = template.content.firstElementChild;

      row.querySelector('.tracker__date').value = data.date;
      row.querySelector('.tracker__workout').value = data.workout;
      row.querySelector('.tracker__feeling').value = data.feeling;
      row.querySelector('.tracker__duration').value = data.duration;

      // add events for input
      row.querySelector('.tracker__date').addEventListener('change', ({ target }) => {
        data.date = target.value;
        this.saveEntries();
      });

      row.querySelector('.tracker__workout').addEventListener('change', ({ target }) => {
        data.workout = target.value;
        this.saveEntries();
      });

      row.querySelector('.tracker__feeling').addEventListener('change', ({ target }) => {
        data.feeling = target.value;
        this.saveEntries();
      });

      row.querySelector('.tracker__duration').addEventListener('change', ({ target }) => {
        data.duration = target.value;
        this.saveEntries();
      });

      row.querySelector('.tracker__delete').addEventListener('click', () => {
        this.deleteEntry(data);
      });

      tableBody.appendChild(row);
    };

    // deleted existing rows if any
    tableBody.querySelectorAll('.tracker__row').forEach(row => {
      row.remove();
    });

    this.entries.forEach(data => addRow(data));
  }

  addEntry(data) {
    this.entries.push(data);
    this.saveEntries();
    this.updateView();
  }

  deleteEntry(dataToDelete) {
    this.entries = this.entries.filter(data => data !== dataToDelete);
    this.saveEntries();
    this.updateView();
  }
}


