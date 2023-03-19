package com.blogapis.Payloads;


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.HashSet;
import java.util.Set;

@NoArgsConstructor

@Setter
@Getter
public class UserDto {
	
	
	private int id;
	
	@NotEmpty
	@NotNull
	@Size(min=4,message="Name must be min of 4 characters!")
	private String name;

	@NotEmpty(message = "Email is required !")
	@Email(message="Email Address is not Valid!")
	private String email;
	
	@NotEmpty(message = "Password is required !")
	@Size(min=3, max=12, message="Password contain min 3 and max 12 characters!")
	private String password;
	
	@NotEmpty
	private String about;

	private Set<RoleDto> roles = new HashSet<>();


	@JsonIgnore
	public String getPassword() {
		return this.password;
	}

	@JsonProperty
	public void setPassword(String password) {
		this.password = password;
	}
}