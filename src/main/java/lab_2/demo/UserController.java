package lab_2.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;

@Controller
public class UserController {

    @Autowired
    public UsersService usersService;

    @RequestMapping("/api/users")
    @ResponseBody
    public UsersPage users(
            @RequestParam(name="page-number", defaultValue = "1") Integer pageNumber,
            @RequestParam(name="page-size", defaultValue = "20") Integer pageSize)
    {
        return this.usersService.getUsers(pageNumber,pageSize);
    }

    @RequestMapping(
            value = "/api/user/create",
            method = RequestMethod.POST,
            consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    @ResponseBody
    public UserEntity createUser(@RequestBody UserEntity user) {
        //TODO: odwołanie do serwisu
        return user;
    }
}
