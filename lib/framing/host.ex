defmodule Framing.Host do
  alias Framing.Main
  alias Framing.Actions

  require Logger

  # Actions
  def fetch_contents(data) do
    data
    |> Actions.update_host_contents()
  end

  def change_page(data, page) do
    if page in Main.pages do
      %{data | page: page}
      |> Actions.change_page(page)
    else
      data
    end
  end

  def all_reset(data) do
    :random.seed(:os.timestamp)
    flag = true
    data = data |> Map.put(:participants, Enum.into(Enum.map(data.participants, fn { id, _ } ->
      {id,
        %{
          question_text: data.question_text,
          sequence: "question1",
          question1: 0,
          question2: 0,
          active: true,
          joined: Map.size(data.participants),
          qswap: true,
          oneone: 0,
          onetwo: 0,
          twoone: 0,
          twotwo: 0,
        }
      }
    end), %{}))
                |> Map.put(:joined, Map.size(data.participants))
                |> Map.put(:answered, 0)
                |> Map.put(:oneone, 0)
                |> Map.put(:onetwo, 0)
                |> Map.put(:twoone, 0)
                |> Map.put(:twotwo, 0)
    data = data |> Map.put(:participants, data.participants
                |> Map.merge(data.participants
                |> Enum.shuffle
                |> Enum.take_every(2)
                |> Enum.map(fn {id, value} -> {id, Map.put(value, :qswap, false)} end)
                |> Enum.into(%{})))
    Actions.all_reset(data)
  end

  def send_result(data, result) do
    data = data  |> Map.put(:participants, Enum.into(Enum.map(data.participants, fn { id, value } ->
      {id, value |> Map.put(:oneone, result["oneone"]) |> Map.put(:onetwo, result["onetwo"]) |> Map.put(:twoone, result["twoone"]) |> Map.put(:twotwo, result["twotwo"])} end), %{}))
                 |> Map.put(:oneone, result["oneone"]) |> Map.put(:onetwo, result["onetwo"]) |> Map.put(:twoone, result["twoone"]) |> Map.put(:twotwo, result["twotwo"])
                 |> Map.put(:answered, 0)
    Actions.send_result(data, result)
  end

  def update_question(data, question_text) do
    data = data |> Map.put(:question_text, question_text)
                     |> Map.put(:participants, Enum.into(Enum.map(data.participants, fn { id, value } ->
                       { id, value |> Map.put(:question_text, question_text) } end), %{}))
    Actions.update_question(data, question_text)
  end

  # Utilities
  def format_contents(data) do
    data
  end
end