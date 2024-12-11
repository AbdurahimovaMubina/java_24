async function findNationality() {
    const name = document.getElementById("nameInput").value.trim();
    const resultList = document.getElementById("result");
  
    resultList.innerHTML = "";
  
    if (!name) {
      const li = document.createElement("li");
      li.textContent = "Iltimos, ism kiriting!";
      resultList.appendChild(li);
      return;
    }
  
    try {
      const response = await fetch(`https://api.nationalize.io/?name=${name}`);
      const data = await response.json();
  
      if (data.country.length > 0) {
        data.country.forEach(async (item) => {
          const li = document.createElement("li");
          const countryId = item.country_id.toLowerCase();
          const flagUrl = `https://flagcdn.com/w40/${countryId}.png`;
          li.innerHTML = `
            ${item.country_id} - ${Math.round(item.probability * 100)}% 
            <img src="${flagUrl}" alt="${
            item.country_id
          } bayrog'i" onerror="this.style.display='none';">
          `;
          resultList.appendChild(li);
        });
      } else {
        const li = document.createElement("li");
        li.textContent = "Kechirasiz, bu ismga oid ma'lumot topilmadi.";
        resultList.appendChild(li);
      }
    } catch (error) {
      const li = document.createElement("li");
      li.textContent = "Xatolik yuz berdi. Iltimos, qayta urinib ko‘ring.";
      resultList.appendChild(li);
      console.error(error);
    }
  }
  