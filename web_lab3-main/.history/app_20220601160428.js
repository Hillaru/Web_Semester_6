async function go() {
    let vacancies = document.getElementById("input").value;
    let request = `https://api.hh.ru/vacancies?per_page=100&page=1&text=${vacancies}`;
    let response = await fetch(request).then(response => response.json()).then(data => {
       let vac='';
        for(let i = 0; i<data.items.length;i++)
        {
            let salary = ""
            let salary_struct=data.items[i].salary
            if(data.items[i].salary==null)
            {
                salary=' не указана'
            }
            else
            {
                let currency = data.items[i].salary.currency

                if (salary_struct.from == salary_struct.to)
                {
                    salary = salary_struct.from
                }
                else
                {
                    if (salary_struct.from != null)
                    {
                        salary += "от " + salary_struct.from
                    }
                    if (salary_struct.to != null)
                    {
                        salary += " до " + salary_struct.to
                    }
                }

                if (currency === 'RUR') {

                    salary += " RUB"
                }
                else
                {
                    salary +=" "+ currency
                }

            }
            vac +="Вакансия №"+(i+1)+ "\nНазвание вакансии: "+data.items[i].name +"\nКомпания: "
                +data.items[i].employer.name+"\nГород: "+data.items[i].area.name+"\nЗарплата: "
                +salary+"\nСсылка: "+data.items[i].alternate_url+'\n\n\n'

        }

        document.getElementById("result").innerText=vac;
    })
}
