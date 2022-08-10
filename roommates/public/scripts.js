let roommates = [];
let gastos = [];
let gastosEditing = null;

const getRoommates = async () => {
  const res = await fetch("http://localhost:3000/roommates");
  const data = await res.json();
  roommates = data.roommates;
};

const getGastos = async () => {
  const res = await fetch("http://localhost:3000/gastos");
  const data = await res.json();
  gastos = data.gastos;
};

const imprimir = async () => {
  try {
    await getRoommates();
    await getGastos();
    $("#roommates").html("");
    $("#roommatesSelect").html("");
    $("#roommatesSelectModal").html("");
    roommates.forEach((r) => {
      $("#roommatesSelect").append(`
      <option value="${r.nombre}">${r.nombre}</option>
      `);
      $("#roommatesSelectModal").append(`
      <option value="${r.nombre}">${r.nombre}</option>
      `);
      $("#roommates").append(`
              <tr>
                <td>${r.nombre}</td>
                <td class="text-danger">${r.debe ? r.debe : "-"}</td>
                <td class="text-success">${r.recibe ? r.recibe : "-"}</td>
              </tr>
          `);
    });
    $("#gastosHistorial").html("");
    gastos.forEach((g) => {
      $("#gastosHistorial").append(`
            <tr>
              <td>${g.roommates}</td>
              <td>${g.descripcion}</td>
              <td>${g.monto}</td>
              <td class="d-flex align-items-center justify-content-between">
                <i class="fas fa-edit text-warning" onclick="editGasto('${g.id}')" data-toggle="modal" data-target="#exampleModal"></i>
                <i class="fas fa-trash-alt text-danger" onclick="deleteGasto('${g.id}')" ></i>
              </td>
            </tr>
          `);
    });
  } catch (e) {
    console.log(e);
  }
};

const nuevoRoommates = () => {
  fetch("http://localhost:3000/roommates", { method: "POST" })
    .then((res) => res.json())
    .then(() => {
      imprimir();
    });
};

const agregarGastos = async () => {
  const roommatesSelected = $("#roommatesSelect").val();
  const descripcion = $("#descripcion").val();
  const monto = Number($("#monto").val());
  await fetch("http://localhost:3000/gastos", {
    method: "POST",
    body: JSON.stringify({
      roommates: roommatesSelected,
      descripcion,
      monto,
    }),
  });
  imprimir();
};

const deleteGasto = async (id) => {
  await fetch("http://localhost:3000/gastos?id=" + id, {
    method: "DELETE",
  });
  imprimir();
};

const updateGastos = async () => {
  const roommatesSelected = $("#roommatesSelectModal").val();
  const descripcion = $("#descripcionModal").val();
  const monto = Number($("#montoModal").val());
  await fetch("http://localhost:3000/gastos?id=" + gastosEditing, {
    method: "PUT",
    body: JSON.stringify({
      roommates: roommatesSelected,
      descripcion,
      monto,
    }),
  });
  $("#exampleModal").modal("hide");
  imprimir();
};

const editGasto = (id) => {
  gastosEditing = id;
  const { roommates, descripcion, monto } = gastos.find((g) => g.id == id);
  $("#roommatesSelectModal").val(roommates);
  $("#descripcionModal").html(descripcion);
  $("#montoModal").val(monto);
};

imprimir();
