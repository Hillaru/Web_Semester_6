async function go() {
    let vacancies = document.getElementById("input").value;
    let request = `https://api.hh.ru/vacancies?per_page=100&page=1&text=${vacancies}`;
    let response = await fetch(request).then(response => response.json()).then(data => {
       let vac='';
        for(let i = 0; i<data.items.length;i++)
        {
            let salary = ""
            if(data.items[i].salary==null)
            {
                salary=' не указана'
            }
            else
            {

                if (data.items[i].salary.from == data.items[i].salary.to)
                {
                    salary = data.items[i].salary.from
                }
                else
                {
                    if (data.items[i].salary.from != null)
                    {
                        salary += "от " + data.items[i].salary.from
                    }
                    if (data.items[i].salary.to != null)
                    {
                        salary += " до " + data.items[i].salary.to
                    }
                }

                if (data.items[i].salary.currency === 'RUR') {

                    salary += " рублей"
                }
                else
                {
                    salary +=" "+ data.items[i].salary.currency
                }

            }
            vac +="Вакансия №"+(data.items[i].id+1)
                +"\nНазвание вакансии: "+data.items[i].name 
                +"\nКомпания: "+data.items[i].employer.name
                +"\nГород: "+data.items[i].area.name
                +"\nЗарплата: "+salary
                +"\nСсылка: "+data.items[i].alternate_url+'\n\n\n'

        }

        document.getElementById("result").innerText=vac;
    })
}
